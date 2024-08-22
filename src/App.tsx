import React from 'react';
import './App.css'

const App: React.FC = () => {
    return (
        <div className={'app'}>
            <button onClick={() => console.log('test')} data-testid="foo-bar">
                Foo
            </button>
        </div>
    );
};

export default App;

