import autocannon, { AutocannonResult } from 'autocannon';
import { PassThrough } from 'stream';
import dotenv from 'dotenv';

dotenv.config(); 

async function runLoadTest(
  url: string,
  connections: number,
  duration: number,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  headers: Record<string, string> = {}
): Promise<AutocannonResult> {
  const outputStream = new PassThrough();

  return new Promise((resolve, reject) => {
    const test = autocannon({
      url,
      connections,
      duration,
      method,
      headers,
    });

    autocannon.track(test, { outputStream });

    outputStream.on('data', (data) => {
      process.stdout.write(data);
    });

    test.on('done', (result: AutocannonResult) => {
      resolve(result);
    });

    test.on('error', (err) => {
      reject(err);
    });
  });
}

async function compareLoadTests(
  url1: string,
  url2: string,
  connections: number,
  duration: number
) {
  const [result1, result2] = await Promise.all([
    runLoadTest(url1, connections, duration, 'GET', {
      Authorization: `Bearer ${process.env.TOKEN}`,
    }),
    runLoadTest(url2, connections, duration, 'GET', {
      Authorization: `Bearer ${process.env.TOKEN}`,
    }),
  ]);

  console.log('\n########### COMPARAÇÃO DE TESTES DE CARGA ###########\n');
  if (result1.requests.total > result2.requests.total) {
    console.log(
      `A rota SEM CACHE teve melhor desempenho,\ncom vantagem de ${
        result1.requests.total - result2.requests.total
      } requisições.\nURL: ${url1}`
    );
  } else if (result1.requests.total < result2.requests.total) {
    console.log(
      `A rota COM CACHE teve melhor desempenho,\ncom vantagem de ${
        result2.requests.total - result1.requests.total
      } requisições.\nURL: ${url2}`
    );
  } else {
    console.log('Ambas as URLs tiveram o mesmo número de requisições.');
  }
  console.log(
    '\n#####################################################\n'
  );
}


const url1 = 'http://localhost:3000/decks/sem-cache/my-decks';
const url2 = 'http://localhost:3000/decks/com-cache/my-decks';
const connections = 100;
const duration = 10;

compareLoadTests(url1, url2, connections, duration).catch((err) => {
  console.error('Erro ao executar o teste de carga:', err);
});
