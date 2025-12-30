import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <div>
            <Link to={"/"}>
                <img src="/logo.svg" className="w-full block" alt="Logotipo Devtree" />
            </Link>
        </div>
    )
}

