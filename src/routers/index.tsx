import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

import Home from "@/pages/home";

const Detail = React.lazy(() => import("@/pages/detail"));
const Ranking = React.lazy(() => import("@/pages/ranking"));
const Shelf = React.lazy(() => import("@/pages/shelf"));
const Chapter = React.lazy(() => import("@/pages/chapter"));
const Search = React.lazy(() => import("@/pages/search"));
const BookList = React.lazy(() => import("@/pages/bookList"));
const Category = React.lazy(() => import("@/pages/category"));

const Router: React.FC = React.memo(() => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/shelf",
      element: <Shelf />,
    },
    {
      path: "/ranking",
      element: <Ranking />,
    },
    {
      path: "/category",
      element: <Category />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/book-list/:key",
      element: <BookList />,
    },
    {
      path: "/book/:id",
      element: <Detail />,
    },
    {
      path: "/book/:bookId/:chapterId",
      element: <Chapter />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return element;
});

export default Router;
