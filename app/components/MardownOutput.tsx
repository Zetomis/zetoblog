import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const MarkdownOutput = ({ blogContent }: { blogContent: string }) => {
    return (
        <div className="w-full h-fit bg-white rounded px-2 py-1 prose blog_output">
            <ReactMarkdown className="break-words">{blogContent}</ReactMarkdown>
        </div>
    );
};

export default MarkdownOutput;
