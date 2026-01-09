import { createEffect, createSignal, Match, onMount, Switch } from "solid-js";
import "./App.css";

function App() {
  const [text, setText] = createSignal("");
  const [settings, setSettings] = createSignal(true);
  const [time, setTime] = createSignal<number>();
  const [scrolling, setScrolling] = createSignal(false);
  const [ref, setRef] = createSignal<HTMLElement>();

  createEffect(() => {
    const stuff: HTMLElement | undefined = ref();
    if (stuff) {
      stuff.focus();
    }
  });

  createEffect(() => {
    if (!scrolling()) {
      document.exitFullscreen();
    }
  });

  createEffect(() => {
    const stuff: HTMLElement | undefined = ref();
    if (stuff && scrolling()) {
      window.document.querySelector("#root")!.requestFullscreen();
      if (stuff.scrollWidth > window.innerWidth - 100) {
        stuff.classList.remove("negative-margin");
        setTimeout(() => {
          stuff.style.setProperty(
            "--width",
            `${Math.max(0, stuff.scrollWidth - window.innerWidth)}`
          );
          stuff.classList.add("with-transition");
          stuff.classList.add("negative-margin");
        }, 1000);
      }
    }
  });

  onMount(() => {
    const stuff: HTMLElement | undefined = ref();
    if (stuff) {
      stuff.focus();
    }
  });
  return (
    <>
      <Switch>
        <Match when={settings()}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (time()) {
                setSettings(false);
              }
            }}
          >
            <h1>Refresh to change it!!</h1>
            <input
              ref={setRef}
              value={time()}
              placeholder="suggested 500"
              type="number"
              onChange={(e) => setTime(parseInt(e.target.value))}
              onFocusOut={() => ref()?.focus()}
            />
            <button type="submit">Set milliseconds</button>
            <h6>
              <a href="https://github.com/NessunoZero" target="blank">
                NessunoZero
              </a>{" "}
              needed this thing, and made a spartan version of it.
            </h6>
          </form>
        </Match>
        <Match when={!scrolling()}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setScrolling(true);
            }}
          >
            <h1>Type what ever you wanna show!!</h1>
            <h2>{time()} milliseconds per letter</h2>
            <input
              ref={setRef}
              value={text()}
              onChange={(e) => setText(e.target.value)}
              onFocusOut={() => ref()?.focus()}
            />
            <button type="submit">Submit</button>
            <h6>
              <a href="https://github.com/NessunoZero" target="blank">
                NessunoZero
              </a>{" "}
              needed this thing, and made a spartan version of it.
            </h6>
          </form>
        </Match>
        <Match when={scrolling()}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setScrolling(false);
            }}
          >
            <button
              ref={setRef}
              onFocusOut={() => ref()?.focus()}
              id="full-screen"
              type="submit"
              style={{
                "--length": text().length,
                "--milliseconds": time(),
              }}
            >
              <div
                class="text"
                on:transitionend={() => {
                  const stuff: HTMLElement | undefined = ref();
                  if (
                    stuff &&
                    stuff.classList.contains("with-transition") &&
                    stuff.classList.contains("negative-margin")
                  ) {
                    setTimeout(() => {
                      stuff.classList.remove("with-transition");
                      stuff.classList.remove("negative-margin");

                      setTimeout(() => {
                        stuff.style.setProperty(
                          "--width",
                          `${Math.max(
                            0,
                            stuff.scrollWidth - window.innerWidth
                          )}`
                        );
                        stuff.classList.add("with-transition");
                        stuff.classList.add("negative-margin");
                      }, 1500);
                    }, 500);
                  }
                }}
              >
                {text()}
              </div>
              <div class="progress" />
            </button>
          </form>
        </Match>
      </Switch>
    </>
  );
}

export default App;
