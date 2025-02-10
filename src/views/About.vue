<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">О нас</h1>

    <div class="card shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-primary">Лин-лаборатория ЮГУ</h2>
        <p class="card-text">
          В 2020 году ООО «Газпромнефть-Хантос» открыл Лин-лабораторию на базе Югорского государственного университета.
        </p>

        <h4 class="mt-4">Наши цели</h4>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Создание системы обмена информацией между ЮГУ и организациями ХМАО.</li>
          <li class="list-group-item">Координация инновационной деятельности ЮГУ.</li>
          <li class="list-group-item">Популяризация бережливого производства.</li>
          <li class="list-group-item">Развитие образовательных проектов.</li>
          <li class="list-group-item">Коммерциализация разработок.</li>
        </ul>

        <h4 class="mt-4">Основные направления деятельности</h4>
        <div class="row">
          <div class="col-md-6">
            <ul class="list-group">
              <li class="list-group-item">✅ Повышение квалификации</li>
              <li class="list-group-item">✅ Образовательные программы</li>
              <li class="list-group-item">✅ Профориентация школьников</li>
              <li class="list-group-item">✅ Научная деятельность</li>
            </ul>
          </div>
          <div class="col-md-6">
            <ul class="list-group">
              <li class="list-group-item">✅ Популяризация и PR</li>
              <li class="list-group-item">✅ Студенческий клуб "Smart Lean Group"</li>
              <li class="list-group-item">✅ Коммерциализация идей</li>
            </ul>
          </div>
        </div>

        <h4 class="mt-4">Студенческий клуб "Smart Lean Group"</h4>
        <p>Клуб объединяет студентов 2-3 курсов Института цифровой экономики и Института нефти и газа.</p>
        <ul class="list-group">
          <li class="list-group-item">🎲 Разработка имитационных игр</li>
          <li class="list-group-item">🏭 Оптимизация производственных процессов</li>
          <li class="list-group-item">📊 Улучшение бизнес-процессов предприятий Югры</li>
        </ul>

        <h4 class="mt-4">Реализованные проекты</h4>
        <div class="accordion" id="projectsAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#project1">
                📌 Картирование информационных потоков
              </button>
            </h2>
            <div id="project1" class="accordion-collapse collapse show" data-bs-parent="#projectsAccordion">
              <div class="accordion-body">
                Разработка карт текущего и идеального состояния бизнес-процессов компании «Газпромнефть-Хантос».
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#project2">
                📌 Оптимизация бизнес-процессов ОТРК «Югра»
              </button>
            </h2>
            <div id="project2" class="accordion-collapse collapse" data-bs-parent="#projectsAccordion">
              <div class="accordion-body">
                Оптимизировано 6 бизнес-процессов, производительность труда выросла на 7%.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#project3">
                📌 Разработка авторских игр
              </button>
            </h2>
            <div id="project3" class="accordion-collapse collapse" data-bs-parent="#projectsAccordion">
              <div class="accordion-body">
                Игры «Лин в 5 шагов», «Железный беспорядок», «5 почему мне нужно учиться в ЮГУ».
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#project4">
                📌 Совместное повышение квалификации
              </button>
            </h2>
            <div id="project4" class="accordion-collapse collapse" data-bs-parent="#projectsAccordion">
              <div class="accordion-body">
                10 студентов сертифицированы как «Навигатор системы непрерывных улучшений».
              </div>
            </div>
          </div>
        </div>

        <h4 class="mt-4">Наши партнеры</h4>
        <p>Лин-лаборатория сотрудничает с ЦУР, Региональным центром компетенций и участвует в проекте «Трансформация ЮГУ».</p>

        <h4 class="mt-4 text-center">📩 Мы всегда открыты для сотрудничества!</h4>
      </div>
    </div>
  </div>

</template>

<script>

</script>