import { Button } from "@/components/ui/button.tsx";
import { Input, Rating } from "@mantine/core";

function App() {
  return (
    <main className={"w-full h-full flex justify-center items-center flex-col"}>
      <Input placeholder="Input component" />
      <Button>Test</Button>
      <Rating defaultValue={2} />
    </main>
  );
}

export default App;
