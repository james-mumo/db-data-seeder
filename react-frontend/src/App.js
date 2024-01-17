import ViewsDataComponent from "./components/ViewsDataComponent";
import SeedButtonComponent from "./components/SeedButtonComponent";
import SeedData from "./components/SeedData";

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side with ViewsDataComponent */}
      <div className="w-1/2 bg-gray-800 text-white p-8">
        <ViewsDataComponent />
      </div>

      {/* Right side with SeedButtonComponent */}
      <div className="w-1/2 bg-gray-200 p-8">
        <SeedData />
      </div>
    </div>
  );
}

export default App;
