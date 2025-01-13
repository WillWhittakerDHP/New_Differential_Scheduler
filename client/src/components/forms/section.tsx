interface SectionProps {
    title: string;
    data: Array<Record<string, any>>;
    type: string;
    handleUpdate: (type: string, id: number, field: string, value: string | number) => void;
    handleSave: (type: string, id: number) => void; // Required prop for saving individual rows
}

const Section: React.FC<SectionProps> = ({ title, data, type, handleUpdate, handleSave }) => {
    return (
        <div>
            <h2>{title}</h2>
            <table>
                <thead>
                    <tr>
                        {data.length > 0 &&
                            Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
                        {<th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            {Object.entries(item).map(([key, value]) => (
                                <td key={key}>
                                    <input
                                        type={typeof value === 'number' ? 'number' : 'text'}
                                        value={value}
                                        onChange={(e) =>
                                            handleUpdate(
                                                type,
                                                item.id,
                                                key,
                                                typeof value === 'number'
                                                    ? Number(e.target.value)
                                                    : e.target.value
                                            )
                                        }
                                    />
                                </td>
                            ))}
                            {handleSave && (
                                <td>
                                    <button
                                        onClick={() => {
                                            console.log(`Saving ${type} with ID ${item.id}`);
                                            handleSave(type, item.id);
                                        }}
                                    >
                                        Save
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Section