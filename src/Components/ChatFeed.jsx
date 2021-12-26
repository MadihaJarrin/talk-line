import React from 'react';
import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessaeg from './TheirMessaeg';

const ChatFeed = (props) => {
    // console.log(props);
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat]; //if chats exist then find chats and then the activeChat 

    // console.log(chat, userName, messages);

    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map((person, index) => person.last_read === message.id && (
            <div
                key={`read_${index}`}
                className='read-receipts'
                style={{
                    float: isMyMessage ? "right" : "left", backgroundImage: `url(${person?.person?.avatar})`
                }}
            />

        ))
    }

    const renderMessages = () => { //functional component for generating messages 
        const keys = Object.keys(messages);
        // console.log(keys);

        return keys.map((key, index) => { //callback function
            const message = messages[key]; //specific message
            const lastMessageKey = index === 0 ? null : keys[index - 1]; //if index is 0 then return null else return the last message
            const isMyMessage = userName === message.sender.username;

            return (
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className="message-block">
                        {
                            //if it is mymessege we are going to render Mymessege else render theirmessage
                            isMyMessage
                                ? <MyMessage message={message} />
                                : <TheirMessaeg message={message} lastMessage={messages[lastMessageKey]}
                                />
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>

                </div>
            )

        })
    }
    // renderMessages();
    if (!chat) return 'Loading...'; //in chat title 

    return (
        <div className='chat-feed'>
            <div className='chat-title-container'>
                <div className='chat-title'> {chat?.title}  </div>
                <div className='chat-subtitle'>
                    {chat.people.map((person) => `${person.person.username}`)}
                </div>
            </div>

            {renderMessages()}

            <div style={{ height: '100px' }} />

            <div className='message-form-container'>
                <MessageForm{...props} chatId={activeChat} />
            </div>

        </div>
    );
};

export default ChatFeed;