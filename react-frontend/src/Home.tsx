type HomeProps = {
    onLogin: () => Promise<void>
};

const Home = ({ onLogin }: HomeProps) => { 
    return (
      <>
        <h2>Home (Public)</h2>
        <button type="button" onClick={onLogin}>
          Sign In
        </button>
    </>
  );
  };

export default Home