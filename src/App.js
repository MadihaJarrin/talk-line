import logo from './logo.svg';
import { ChatEngine } from 'react-chat-engine';
import './App.css';
import ChatFeed from './Components/ChatFeed';
import LoginForm from './Components/LoginForm';

function App() {
  if (!localStorage.getItem('username'))
    return <LoginForm />

  return (
    <div className="App">
      <ChatEngine
        height="100vh"
        projectID="de03c57f-e660-4cf6-8ada-9200eaa9dc41"
        userName={localStorage.getItem('username')}
        userSecret={localStorage.getItem('password')}

        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      />

    </div>
  );
}

export default App;
