import { ToastContainer } from 'react-toastify';

// import "./App.css";
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      {/* <section id="center">
        <div className="hero"></div>
        <div></div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section> */}
    </>
  );
}

export default App;
