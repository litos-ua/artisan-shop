export function Dropdown({ question, isOpen, toggle, answer }) {
    return (
        <li>
            <strong onClick={toggle}>
                {question} {isOpen ? "▼" : "►"}
            </strong>
            {isOpen && (
                <p>{answer}</p>
            )}
        </li>
    );
}
