# Express.js-сервер приложения для знакомств

Текущий статус: в разработке по состоянию на 27 июня 2022

## Кратко о структуре проекта
Папки корневого каталога:
1) Assets - будет содержать помимо прочего html-темплейты для сервиса рассылки писем (./shared/services/EmailService.ts и ./shared/services/EmailTemplateService.ts)
2) Configs - содержит конфигурационный файл (несекретные ключи, url для подключения к базе и прочее). Объект инициализируется при каждом запуске сервера в зависимости от откржения (PRD, DEV)
3) Server-Configs - еще конфигурационные файлы: различные константы и опции, запуск разных служб и сервисов, мидлвары
4) Shared - содержит папки: 
- classes - классы, 
- enums, 
- interfaces, 
- services - здесь разные сервисы (отправки писем, аутентификация, обработка ошибок). Файл Util - Класс с пока что одним методом 'findControllerFiles' - ищет файлы-контроллеры и возвращает массив их адресов

5) Src - содержит папки: 
- api-routes: папка с единсвенным файлом, в котором перечислены задействованные в сервере роуты, 
- controllers - соджержит по 1 папке на каждый сервис. Папка сервиса состоит из 3 файлов: контроллер, сервис с логикой и файл с юнит-тестами
- database - схемы и модели для Mongo

## Установка и запуск
Для запуска сервера необходимо локально запустить MongoDB на 27017 порту.
Рекомендую docker: https://hub.docker.com/_/mongo

Для запуска сервера выполните в терминале команду `npm run server-local:watch`
По адресу `http://localhost:3002/api-docs#/` будет доступен сваггер

Входная точка сервера - файл server.ts в корневом каталоге.
Сервер запускатеся вызовом функции 'initServer', которая по очереди запускает разные службы сервера, а затем запускает его самого.

## Примечания
Обратите внимание, что сервис для работы с пользователями уже покрыт unit-тестами (./src/controllers/user/user.service.test.ts)
Для запуска тестов выполните в терминале `npm run test`

Все обращения к серверу кроме GET-запросов логгируются и выводятся в терминал

Любые контроллер-файлы, созданные в папке `controllers`, подключаются к проeкту автоматически. Ничего не требуется делать вручную.
