import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const editTodo = () => {
  const router = useRouter();
  const { title } = router.query;
  
  const [todo, setTodo] = useState({ title: "", desc: "" });
  
  useEffect(() => {
      let todos = localStorage.getItem("todos");
      console.log("title1", title);
      if (todos) {
          let todosJson = JSON.parse(todos);
          let fTodo = todosJson.filter(e => title == e.title);

      if (fTodo.length > 0) {
        setTodo(fTodo[0]);
      }
    }
  }, [router.isReady]);

  const updateTodo = () => {
    let todos = localStorage.getItem("todos");
    if (todos) {
      let todosJson = JSON.parse(todos);
      if (
        todosJson.filter((value) => {
          return value.title == title;
        }).length > 0
      ){
          let index =todosJson.findIndex((value) => {
            return value.title == title;
          })
          todosJson[index].title = todo.title
          todosJson[index].desc = todo.desc
          localStorage.setItem("todos", JSON.stringify(todosJson));
          alert("ToDo updated successfully!");
      }
      else {
        alert("ToDo not found!");
      }
    } else {
      alert("No ToDos to be updated!");
    }
    setTodo({ title: "", desc: "" });
  };
  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
    console.log(todo);
  };

  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div class=" bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
              Update ToDo
            </h2>
            <div class="relative mb-4">
              <label for="title" class="leading-7 text-sm text-gray-600">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={todo.title}
                onChange={onChange}
              />
            </div>
            <div class="relative mb-4">
              <label for="desc" class="leading-7 text-sm text-gray-600">
                Task
              </label>
              <input
                type="text"
                id="desc"
                name="desc"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={todo.desc}
                onChange={onChange}
              />
            </div>
            <button
              class="text-white bg-indigo-500 border-0 py-2 px-8 w-fit focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={updateTodo}
            >
              Update ToDo
            </button>
            {/* <p class="text-xs text-gray-500 mt-3">
              Literally you probably haven't heard of them jean shorts.
            </p> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default editTodo;
