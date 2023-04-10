import { createEffect, createMemo, createSignal, onMount } from "solid-js";
import { Button } from "../../common/buttons";
import { Input } from "../../common/inputs";
import MurmelImg from "../../../assets/murmel.png";
import "./index.scss";
import { generatePasswordHash } from "../../../services/password.services";

export default () => {
  const [conf, setConf] = createSignal({ username: "" });

  const [url, setUrl] = createSignal<any>("Not found");
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const [length, setLength] = createSignal(24);
  const [iterations, setIterations] = createSignal(256);

  onMount(() => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log(tabs);
        const _url = tabs[0].url ? new URL(tabs[0].url).host : "Not found";
        setUrl(_url);
      });
    } catch (e) {
      console.error("Could not use Chrome API. Probably not in extension.");
    }

    try {
      const conf = JSON.parse(
        window.localStorage.getItem("murmelpass_conf") ?? "null"
      );
      if (conf !== null) {
        setConf(conf);
        setUsername(conf.username);
        setLength(conf.length);
      }
    } catch (e) {}
  });

  createEffect(() => {
    const newConf = { ...conf(), username: username(), length: length() };
    window.localStorage.setItem("murmelpass_conf", JSON.stringify(newConf));
  });

  const handleOnGeneratePassword = async () => {
    setLoading(true);
    const hash = await generatePasswordHash(
      password(),
      url().toString() + username(),
      length(),
      iterations()
    );
    navigator.clipboard.writeText(hash);
    setLoading(false);
  };

  return (
    <div class="main-page">
      <header>
        <h2>MURMELPASS</h2>
        <img id="murmel-img" src={MurmelImg} />
      </header>
      <div class="input-container">
        <div>
          <label>URL</label>
          <Input
            id="url-input"
            accessor={url}
            onInput={(e: any) => setUrl(e.target.value)}
            onClear={() => setUrl("")}
          />
        </div>
        <div>
          <label>Username</label>
          <Input
            id="username-input"
            accessor={username}
            onInput={(e: any) => setUsername(e.target.value)}
            onClear={() => setUsername("")}
          />
        </div>
        <div>
          <label>Password</label>
          <Input
            id="password-input"
            type="password"
            accessor={password}
            onInput={(e: any) => setPassword(e.target.value)}
            onClear={() => setPassword("")}
          />
        </div>
        <div>
          <label>Length</label>
          <div class="length-input-container">
            <input
              id="length-number"
              type="number"
              min="1"
              max="1024"
              value={length()}
              onInput={(e: any) => setLength(parseInt(e.target.value))}
            />
            <input
              id="length-rangeslider"
              type="range"
              min="1"
              max="1024"
              value={length()}
              onInput={(e: any) => setLength(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
      <Button
        id="generate-button"
        loading={loading}
        style={{ width: "100%" }}
        onClick={handleOnGeneratePassword}
      >
        COPY PASSWORD
      </Button>
    </div>
  );
};
