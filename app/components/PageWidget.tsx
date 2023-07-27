import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const PageWidget = ({ page, amount }: { page: number; amount: number }) => {
    return (
        <div className="flex flex-col gap-y-2 items-center">
            <div className="grid grid-cols-3 gap-x-2">
                <Link
                    href={`/blogs?p=${Number(page) - 1}`}
                    className={`${
                        page > 1 ? "button_create" : "button_disabled"
                    }`}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <div className="text-center py-2">{page}</div>
                <Link
                    href={`/blogs?p=${Number(page) + 1}`}
                    className={`${
                        Math.ceil(amount / 8) > page
                            ? "button_create"
                            : "button_disabled"
                    }`}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            </div>
            <form></form>
        </div>
    );
};

export default PageWidget;
