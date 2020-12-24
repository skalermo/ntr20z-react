import React from 'react';

const Alert = ({ hide, type, msg }) => {
    if (hide) return null;
    switch (type) {
        case "success":
            return (
                <div class="alert alert-success">
                    {msg}
                </div>
            );
        case "danger":
            return (
                <div class="alert alert-danger">
                    {msg}
                </div>
            )
        default:
            return null;
    }
}

export default Alert;