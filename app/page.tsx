import Link from "next/link";

const Page = () => {
    return (
        <div className="grid justify-center">
            <h1 className="font-bold text-4xl text-center block mb-4">
                This is ZetoBlog
            </h1>
            <p className="text-center font-semibold block mb-2">
                Write, comment and share Blog with other people
            </p>
            <Link
                href={"/blogs?p=1"}
                className="button_create w-fit justify-self-center"
            >
                Browse
            </Link>
        </div>
    );
};

export default Page;
