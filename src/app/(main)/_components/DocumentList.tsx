"use client";

import { useParams } from "next/navigation";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import Item from "./Item";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

export default function DocumentList({
  data,
  level = 0,
  parentDocumentId,
}: DocumentListProps) {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function onExpand(documentId: string) {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  }

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  function onRedirect(documentId: string) {
    router.push(`/documents/${documentId}`);
  }

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 32}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents.map((document) => (
        <div>
          <Item
            id={document._id}
            icon={FileIcon}
            level={level}
            label={document.title}
            documentIcon={document.icon}
            expanded={expanded[document._id]}
            active={params.documentId === document._id}
            onExpand={() => onExpand(document._id)}
            onClick={() => onRedirect(document._id)}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
}
