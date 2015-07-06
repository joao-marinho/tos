# tos

##  Dependecias

### Node

- Baixar o node do site oficial nodejs.org
- Para instalar siga os passos fornecidos no README deles, que é basicamente:
```
./configure
make
make install
```
- Para ver se instalou certo, execute o comando "node --version" e "npm --version"


### PostgreSQL

- Seguir os passos no site http://www.postgresql.org/download/linux/ubuntu/, que é basicamente:
	apt-get install postgresql-9.4

## Build

- Create a file ".env" following the steps in .env_example
- Execute the following comands:
```
npm install
node_modules/node-pg-migrate/bin/pg-migrate up
npm start
bower install
```
## Errors

- If occours a error:
```
ECMDERR Failed to execute "git ls-remote --tags --heads git://github.com/twbs/bootstrap.git", exit code of #128 fatal: unable to connect to github.com: github.com[0: 192.30.252.130]: errno=Connection timed out
```
	- Execute:
```
git config --global url."https://".insteadOf git://
```
