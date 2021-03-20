# Документация по GulpConfig v.0.7.0

### Что такое Gulp `https://gulpjs.com/`

**Gulp** — это таск-менеджер для автоматического выполнения часто используемых задач (например, [минификации](https://ru.wikipedia.org/wiki/%D0%9C%D0%B8%D0%BD%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)) "Минификация (программирование)"), тестирования, объединения файлов), написанный на языке программирования JavaScript. Программное обеспечение использует командную строку для запуска задач, определённых в файле Gulpfile[[2]](https://ru.wikipedia.org/wiki/Gulp#cite_note-2). Создан как ответвление от проекта [Grunt](https://ru.wikipedia.org/wiki/Grunt_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%BD%D0%BE%D0%B5_%D0%BE%D0%B1%D0%B5%D1%81%D0%BF%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D0%B5)) "Grunt (программное обеспечение)"), чтоб взять из него лучшие практики[[3]](https://ru.wikipedia.org/wiki/Gulp#cite_note-3). Распространяется через менеджер пакетов [NPM](https://ru.wikipedia.org/wiki/NPM "NPM") под [MIT лицензией](https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_MIT "Лицензия MIT")[[4]](https://ru.wikipedia.org/wiki/Gulp#cite_note-4).

От Grunt отличается тем, что код задач записывается JavaScript кодом, а не в стиле конфигурационного файла[[5]](https://ru.wikipedia.org/wiki/Gulp#cite_note-5).

На 2020-й год насчитывается более 3800 плагинов для Gulp[[https://gulpjs.com/plugins/ 1]](https://ru.wikipedia.org/wiki/Gulp#cite_note-6).

Взаимодействия между частями программы реализуется через оператор `.pipe()`, выполняя по одной задаче за раз, не затрагивая исходные файлы, до конца процедуры. Это даёт возможность комбинации плагинов в любой последовательности и количестве.

Так же в Gulp усовершенствована система сборки. Это значит, что помимо запуска задач, можно также копировать файлы с места на место, компилировать и развёртывать проект в новом окружении.

---

---

**Как использовать Мой GulpConfig**

Установка Node.js `https://nodejs.org/en/`

после установки заходим в папку с проектом и в командной строке прописываем `npm i`,

`npm install`npm i собирется проект со всеми плагинами и тд

Запуск Gulp:

заходим в папку с проектом и в командной строке прописываем `gulp`

---

---

вся разработка проекта ведется в папке src/

* src/
  * fonts/названия файла.ttf и тд
  * img/названия файла.jpg и тд
  * js/component/
    * script.js
  * scss/component/
    * style.scss
  * html/component/
    * index.html

Как это работает пример: плагин(`gulp-file-include`)

```
путь src/html/index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
     @@include('_header.html') 
</body>
</html>
```

```
путь src/component/header.html

<header>
    <h1>LOL</h1>
</header>

```

Во время сборки файл header.html сольется с index.html:

```
путь src/html/index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
     <header>
         <h1>LOL</h1>
     </header>
</body>
</html>
```

CSS:

```
путь src/scss/style.scss


@import 'scss/component/button'
```

```
путь src/scss/component/button.scss

button {
    color: red;
    background-color: black;
}
```

после сборки:

```
путь src/scss/style.scss

button {
    color: red;
    background-color: black;
}
```
