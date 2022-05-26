import React, { createContext, useContext, useReducer, useState } from "react";

const StateContext = createContext();

const initialClick = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

const initialState = {
  screenSize: undefined,
  currentColor: "#03C9D7",
  currentMode: "Light",
  themeSettings: false,
  activeMenu: true,
  isClicked: initialClick,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setScreenSize":
      return { ...state, screenSize: action.payload };
    case "setCurrentColor":
      return { ...state, currentColor: action.payload };
    case "setCurrentMode":
      return { ...state, currentMode: action.payload };
    case "setThemeSettings":
      return { ...state, themeSettings: action.payload };
    case "setActiveMenu":
      return { ...state, activeMenu: action.payload };
    case "setIsClicked":
      return { ...state, isClicked: action.payload };
    default:
      throw state;
  }
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    screenSize,
    currentColor,
    currentMode,
    themeSettings,
    activeMenu,
    isClicked,
  } = state;

  const setMode = (e) => {
    dispatch({
      type: "setCurrentMode",
      payload: e.target.value,
    });
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    dispatch({
      type: "setCurrentColor",
      payload: color,
    });
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    dispatch({
      type: "setIsClicked",
      payload: { ...initialState, [clicked]: true },
    });

  const setScreenSize = (value) => {
    dispatch({
      type: "setScreenSize",
      payload: value,
    });
  };

  const setIsClicked = (value) => {
    dispatch({
      type: "setIsClicked",
      payload: value,
    });
  };

  const setActiveMenu = (value) => {
    dispatch({
      type: "setActiveMenu",
      payload: value,
    });
  };

  const setCurrentColor = (color) => {
    dispatch({
      type: "setCurrentColor",
      payload: color,
    });
  };

  const setCurrentMode = (mode) => {
    dispatch({
      type: "setCurrentMode",
      payload: mode,
    });
  };

  const setThemeSettings = (settings) => {
    dispatch({
      type: "setThemeSettings",
      payload: settings,
    });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
