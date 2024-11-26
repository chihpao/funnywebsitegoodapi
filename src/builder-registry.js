import { Builder } from "@builder.io/react";
import App from "./App";
import ButtonLink from "./components/ButtonLink";
import FunComponent, {
  CatsPage,
  DogsPage,
  MemesPage,
} from "./pages/FunComponent";
import Counter from "./components/Counter/Counter";
import DifyChat from "./pages/DifyChat";
import Homepage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage";
import MainContent from "./pages/MainContent";
import NavBar from "./styles/NavBar";
import ScrollEffectComponent from "./pages/InteractiveComponent";
import SkinnyFooter from "./components/SkinnyFooter";
import '../styles/index.css';

Builder.registerComponent(App, {
  name: "App",
});

Builder.registerComponent(ButtonLink, {
  name: "ButtonLink",
});

Builder.registerComponent(CatsPage, {
  name: "CatsPage",
});

Builder.registerComponent(Counter, {
  name: "Counter",
});

Builder.registerComponent(DifyChat, {
  name: "DifyChat",
});

Builder.registerComponent(DogsPage, {
  name: "DogsPage",
});

Builder.registerComponent(FunComponent, {
  name: "FunComponent",
});

Builder.registerComponent(Homepage, {
  name: "Homepage",
});

Builder.registerComponent(LoadingPage, {
  name: "LoadingPage",
});

Builder.registerComponent(MainContent, {
  name: "MainContent",
});

Builder.registerComponent(MemesPage, {
  name: "MemesPage",
});

Builder.registerComponent(NavBar, {
  name: "NavBar",
});

Builder.registerComponent(ScrollEffectComponent, {
  name: "ScrollEffectComponent",
});

Builder.registerComponent(SkinnyFooter, {
  name: "SkinnyFooter",
});
