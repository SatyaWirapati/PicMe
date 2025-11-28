const Notification = ({ message }) => {
    if (!message) return null;

    return (
        <div key={message} className="animate-slideDown fixed top-5 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-md z-200">
            {message}
        </div>
    )
}
 
export default Notification;