
import "react-hot-toast/dist/index.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {/* Other components */}
    </>
  );
}

export default App;