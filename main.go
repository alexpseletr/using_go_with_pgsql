package main

import (
	"net/http"
	"fmt"
	"html/template"
	"database/sql"
	_ "github.com/lib/pq"
)

func conectDatabase() *sql.DB {
	conection := "host=localhost port=5432 user=postgres password=yourPassword dbname=YourDatabase sslmode=disable"
	db, err := sql.Open("postgres", conection)
	if err != nil {
		panic(err.Error())
	}
	return db
}

type Product struct {
	Code     int
	Description  string
}

var temp = template.Must(template.ParseGlob("templates/*.html"))

func main() {
	http.HandleFunc("/", index)
    fs := http.FileServer(http.Dir("assets/"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))
	fmt.Println("Run  http://localhost:9000/")
	
    http.ListenAndServe(":9000", nil)
}

func index(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.FormValue("description"))
	db := conectDatabase()
	search_description := r.FormValue("description")
	sql := "SELECT codigo,descricao FROM produtos where descricao like UPPER('%"+search_description+"%')"
	selectAllProducts, err := db.Query(sql)
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("Connected!")

	p := Product{}
	products := []Product{}

	for selectAllProducts.Next() {
		err = selectAllProducts.Scan(&p.Code, &p.Description)
		if err != nil {
			panic(err.Error())
		}
		products = append(products, p)
	}

	temp.ExecuteTemplate(w, "Index", products)
	defer db.Close()
}