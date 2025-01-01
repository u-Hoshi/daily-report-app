import breaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const MarkdownView = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, breaks]}
      // prettier-ignore
      components={{
            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
            p:  ({ children }) => <p className="whitespace-pre-wrap mb-4">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
        }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownView;
