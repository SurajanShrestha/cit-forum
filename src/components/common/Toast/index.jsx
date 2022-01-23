import toast, { Toaster } from "react-hot-toast";

export const successToast = (message) => toast.success(message);

export const failureToast = (message) => toast.error(message);

function Toast() {
    return (
        <Toaster
            toastOptions={{
                // Options for all toasts
                duration: 5000,
                style: {
                    borderRadius: '0'
                },
                // Options for Success Toasts
                success: {
                    style: {
                        color: 'green',
                    }
                },
                // Options for Success Toasts
                error: {
                    style: {
                        color: 'red',
                    }
                }
            }}
        />
    );
}

export default Toast;
