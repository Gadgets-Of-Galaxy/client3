import "../styles/adminLists.css";
import { AdminSidebar } from "./AdminSidebar";
import { AdminOverview } from "./AdminOverview";
import axios from 'axios';

export const AdminMessages = ({ messages }) => {
    const deleteMessage = async (messageId) => {
        try {
            const response = await axios.delete(`https://server2-acel.onrender.com/api/admin/contactUs/${messageId}`);
            window.alert(response.data.message);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const replyMessage = (email, subject, body) => {
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    return (
        <div>
            <AdminSidebar activeLink="messageslist"/>
            <section className="orders-section">
                <div className="orders-content">
                    <br />
                    <h2 className="orders-heading">Customer Messages:</h2>
                    <br />
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th><b>Name</b></th>
                                <th><b>Email</b></th>
                                <th><b>Subject</b></th>
                                <th><b>Message</b></th>
                                <th><b>Reply</b></th>
                                <th><b>Delete</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages && messages.length > 0 && messages.map((message, index) => (
                                <tr key={index} className="orders-row">
                                    <td>{message.name}</td>
                                    <td>{message.email}</td>
                                    <td>{message.subject}</td>
                                    <td>{message.message}</td>
                                    <td>
                                        <button className="reply-button" onClick={() => replyMessage(message.email, `Re: ${message.subject}`, '')}>Reply</button>
                                    </td>
                                    <td>
                                        <button className="delete-button" onClick={() => deleteMessage(message._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};
