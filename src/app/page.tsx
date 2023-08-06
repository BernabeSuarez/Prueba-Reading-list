"use client";
import data from "../book.json";
import { useState, useMemo, useEffect } from "react";
import { IBook } from "@/interfaces/IBook";

//reflejar los datos en mas de una pestaña a la vez
function onReadListChanges(callback: (readlist: IBook["ISBN"][]) => void) {
  // esta funcion va a ser  llamada cada vez que ocurra un cambio en el local storage y va a coordinar las pestañas
  function getReadList() {
    const readList = JSON.parse(
      localStorage.getItem("readList") ?? "[]"
    ) as IBook["ISBN"][];
    callback(readList);
  }
  window.addEventListener("storage", getReadList);
  getReadList();
  return () => window.removeEventListener("storage", getReadList);
}

const books: IBook[] = data.library.map((data) => data.book);
const genres: string[] = Array.from(new Set(books.map((book) => book.genre))); //SET no permite valores repetidos por lo que hace un array con un valor por cada genero

export default function Home() {
  const [genre, setGenre] = useState<string>("");
  const [readList, setReadList] = useState<IBook["ISBN"][]>([]);
  const match = useMemo(() => {
    if (!genre) return books;
    return books.filter((book) => {
      if (book.genre !== genre) return false;
      // aca iran mas filtros
      return true;
    });
  }, [genre]);

  function handleBook(book: IBook["ISBN"]) {
    const draft = readList.includes(book)
      ? readList.filter((readBook) => readBook !== book)
      : [...readList, book];
    setReadList(draft);
    localStorage.setItem("readList", JSON.stringify(draft)); //persisitir los libros leidos en localstorage
  }

  useEffect(() => {
    //al cargar el componente consultar el localstorage para ver si hay lista de libros leidos
    const unsuscribe = onReadListChanges(setReadList);
    return () => unsuscribe();
  }, []);

  return (
    <article className="grid gap-4">
      <nav className="flex justify-end">
        <label htmlFor="filtro">Filtrar por genero</label>
        <select
          id="filtro"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">Todos</option>
          {genres.map((genre) => (
            <option value={genre} key={genre}>
              {genre}
            </option>
          ))}
        </select>
      </nav>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 ">
        {match.map((book) => (
          <li
            key={book.ISBN}
            className="grid gap-2 "
            onClick={() => handleBook(book.ISBN)}
          >
            <img
              className="aspect-[9/14] object-cover"
              src={book.cover}
              alt={book.title}
            />
            <p>
              {book.title}
              {readList.includes(book.ISBN) && <span> ⭐</span>}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
