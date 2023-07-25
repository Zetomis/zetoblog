import { Dispatch, SetStateAction } from "react";

const MarkdownInput = ({
    setBlogContent,
}: {
    setBlogContent: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <textarea
            className="w-full border-none outline-none focus:outline-none h-96 rounded px-2 py-1 bg-white"
            placeholder="Type something here..."
            onChange={(e) => setBlogContent(e.target.value)}
        />
    );
};

export default MarkdownInput;
