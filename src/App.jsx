import GovernmentHeader from './components/GovernmentHeader';

function App() {
  return (
    <>
      <GovernmentHeader />
      <div className="container mt-5 ">
        <h1 className="text-center my-2 ">
          UX4G + React (JavaScript)
        </h1>

        <p className="text-center my-2">
          Government Design System integrated successfully
        </p>

        <div className="text-center my-2">
          <button className="btn btn-primary">
            UX4G Button
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
