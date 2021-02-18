package main

import (
	"fmt"
	"me/vector/vector"
	"strings"
	"syscall/js"
)

func run(txt string) string {
	txt = strings.TrimSpace(txt)

	lex := vector.NewLexer(txt)
	toks, err := lex.GenerateTokens()
	if err != nil {
		return err.Error()
	}

	pars := vector.NewParser(toks)
	ast, err := pars.Parse()
	if err != nil {
		return err.Error()
	}

	res, err := vector.Execute(ast)
	if err != nil {
		return err.Error()
	}
	if res == nil {
		return ""
	}

	return res.String()
}

/*func run(txt js.Value) js.Value {
	res, err := vector.Run(txt.String())
	if err != nil {
		return err.Error()
	}
	return res.String()
}*/

func runWrapper() js.Func {
	runFunc := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) != 1 {
			return ""
		}
		return run(args[0].String())
	})
	return runFunc
}

/*func run(txt js.Value) {
	// js.Global().Set("output", js.ValueOf())
	res, err := vector.Run(txt.String())
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res)
}*/

func main() {
	fmt.Println("Hello WASM")
	js.Global().Get("document").Call("getElementById", "headline").Set("innerText", "Vector "+vector.VERSION)
	js.Global().Set("run", runWrapper())
	<-make(chan bool)
}
