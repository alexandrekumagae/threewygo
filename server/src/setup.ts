import { pg } from "./lib/postgres";

import moment from "moment";

async function setup () {
  await pg.connect()

  await pg.query(
    `ALTER TABLE videos DROP CONSTRAINT videos_course_id_fkey`
  )

  await pg.query(
    `DROP TABLE IF EXISTS courses`
  )

  await pg.query(
    `CREATE TABLE courses (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      expiration_date TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  )

  await pg.query(
    `DROP TABLE IF EXISTS videos`
  )

  await pg.query(
    `CREATE TABLE videos (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      path TEXT NOT NULL,
      size BIGINT NOT NULL,
      course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  )

  // const coursesData = [
  //   {
  //     "title": "Fundamentos e Metodologia da Educação Corporativa",
  //     "slug": "fundamentos-e-metodologia-da-educacao-corporativa",
  //     "description": "No cenário globalizado, as organizações governamentais têm percebido os servidores públicos como seu principal ativo, o que faz com que a educação corporativa assuma um papel essencial no desenvolvimento e aprimoramento das competências profissionais. Neste curso, aprenda diferentes métodos e estratégias de ensino aplicados à aprendizagem corporativa e contribua para o crescimento organizacional.",
  //     "expiration_date": moment().add(30, 'days').format('YYYY-MM-DD'),
  //     "videos": [
  //       {
  //         "name": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  //         "path": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  //         "size": 5
  //       },
  //       {
  //         "path": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  //         "size": 10
  //       }
  //     ]
  //   },
  //   {
  //     "title": "Tecnologias e Metodologias Inovadoras Aplicadas à Educação Corporativa",
  //     "slug": "tecnologias-e-metodologias-inovadoras-aplicadas-a-educacao-corporativa",
  //     "description": "No cenário globalizado, as organizações governamentais têm percebido os servidores públicos como seu principal ativo, o que faz com que a educação corporativa assuma um papel essencial no desenvolvimento e aprimoramento das competências profissionais. Neste curso, aprenda diferentes métodos e estratégias de ensino aplicados à aprendizagem corporativa e contribua para o crescimento organizacional.",
  //     "expiration_date": moment().add(60, 'days').format('YYYY-MM-DD'),
  //     "videos": [
  //       {
  //         "path": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  //         "size": 5
  //       }
  //     ]
  //   },
  //   {
  //     "id": "3",
  //     "title": "Tecnologias e Metodologias Inovadoras Aplicadas à Educação Corporativa",
  //     "slug": "tecnologias-e-metodologias-inovadoras-aplicadas-a-educacao-corporativa2",
  //     "description": "No cenário globalizado, as organizações governamentais têm percebido os servidores públicos como seu principal ativo, o que faz com que a educação corporativa assuma um papel essencial no desenvolvimento e aprimoramento das competências profissionais. Neste curso, aprenda diferentes métodos e estratégias de ensino aplicados à aprendizagem corporativa e contribua para o crescimento organizacional.",
  //     "expiration_date": moment().add(0, 'days').format('YYYY-MM-DD'),
  //     "videos": [
  //       {
  //         "path": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  //         "size": 10
  //       }
  //     ]
  //   }
  // ];

  // for (const course of coursesData) {
  //   const { title, slug, description, expiration_date, videos } = course;

  //   const courseResult = await pg.query(
  //     `INSERT INTO courses (title, slug, description, expiration_date) VALUES ($1, $2, $3, $4) RETURNING id`,
  //     [title, slug, description, expiration_date]
  //   );

  //   const courseId = courseResult.rows[0].id;

  //   for (const video of videos) {
  //     const { path, size } = video;
  //     await pg.query(
  //       `INSERT INTO videos (path, size, course_id) VALUES ($1, $2, $3)`,
  //       [path, size, courseId]
  //     );
  //   }
  // }

  console.log('Setup feito com sucesso!')

  await pg.end()
}

setup()