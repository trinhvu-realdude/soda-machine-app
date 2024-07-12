import { cancelTransaction } from "../api";
import { ReleasedProduct } from "../interface";

type MoneyInsertProps = {
    insertedMoney: number;
    releasedProduct: ReleasedProduct | null;
    username: string;
    setInsertedMoney: React.Dispatch<React.SetStateAction<number>>;
    setReleasedProduct: React.Dispatch<
        React.SetStateAction<ReleasedProduct | null>
    >;
};

export const MoneyInsert: React.FC<MoneyInsertProps> = ({
    insertedMoney,
    releasedProduct,
    username,
    setInsertedMoney,
    setReleasedProduct,
}) => {
    const acceptedNotes = [
        { text: "10.000", value: 10000 },
        { text: "20.000", value: 20000 },
        { text: "50.000", value: 50000 },
        { text: "100.000", value: 100000 },
        { text: "200.000", value: 200000 },
    ];

    const handleInsertMoney = (amount: number) => {
        setInsertedMoney((prev) => prev + amount);
    };

    const handleCancelTransaction = async () => {
        if (releasedProduct) {
            // Handle to receive refund if user purchased by calling cancelTransaction API
            const transaction = await cancelTransaction(
                releasedProduct,
                username
            );
            if (transaction.status === "CANCELED") {
                setInsertedMoney(insertedMoney + transaction.amountPaid);
                alert(
                    `Cancelled request. You received ${transaction.amountPaid} VND.`
                );
            }
        } else {
            setInsertedMoney(0);
        }
        setReleasedProduct(null);
    };

    return (
        <div className="money-insert-section">
            {acceptedNotes.map((note, index) => (
                <button
                    key={index}
                    onClick={() => handleInsertMoney(note.value)}
                    className="btn btn-outline-success m-2"
                >
                    {note.text} VND
                </button>
            ))}
            <div className="my-2">
                Inserted Money:{" "}
                {new Intl.NumberFormat("en-US").format(insertedMoney)} VND
            </div>
            <button
                onClick={handleCancelTransaction}
                className="btn btn-outline-danger mt-2"
            >
                Cancel
            </button>
        </div>
    );
};
