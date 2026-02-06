import React from "react";
import "./table.css";
import Pagination from "./pagination/Pagination";

const TableComponent = ({
    columns = [],
    data = [],
    actions = null,
    page = 1,
    totalPages = 1,
    totalResults = 0,
    limit = 10,
    onPageChange,
    onLimitChange,
}) => {
    return (
        <div className="table-wrapper">
            <table className="reusable-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                        {actions && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)}>
                                No data found
                            </td>
                        </tr>
                    ) : (
                        data.map((row, index) => (
                            <tr key={row._id || index}>
                                {columns.map((col) => (
                                    <td key={col.key}>
                                        {col.render
                                            ? col.render(row)
                                            : row[col.key]}
                                    </td>
                                ))}

                                {actions && (
                                    <td className="action-cell">
                                        {actions(row)}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <Pagination
                page={page}
                totalPages={totalPages}
                totalResults={totalResults}
                limit={limit}
                onPageChange={onPageChange}
                onLimitChange={onLimitChange}
            />

        </div>
    );
};

export default TableComponent;
