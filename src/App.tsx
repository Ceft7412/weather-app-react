function App() {
  console.log(import.meta.env.VITE_WEATHER_API);
  return (
    <>
      <main className="min-h-screen flex items-center justify-center">
        <section className="flex gap-2 text-neutral-600 font-medium text-[30px]">
          <span>Currently in </span>
          <form action="" className="w-auto">
            <input
              type="text"
              className="border-b border-neutral-600 resize-none whitespace w-10 outline-none"
              onKeyPress={(e) => {
                e.currentTarget.style.width =
                  (e.currentTarget.value.length + 2) * 13 + "px";
              }}
            />
          </form>
          <span>, it's </span>
        </section>
        <section></section>
        <section></section>
      </main>
    </>
  );
}

export default App;
