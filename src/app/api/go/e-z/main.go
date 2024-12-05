package main

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
)

type UserData struct {
	Username    string                 `json:"username"`
	Name        string                 `json:"name"`
	Views       int                    `json:"views"`
	Description string                 `json:"description"`
	Title       string                 `json:"title"`
	Ranks       []string               `json:"ranks"`
	Presence    map[string]interface{} `json:"presence"`
	Profile     map[string]interface{} `json:"profile"`
	Socials     []map[string]string    `json:"socials"`
	CustomLinks []map[string]string    `json:"custom_links"`
	Songs       []map[string]string    `json:"songs"`
	Theme       map[string]string      `json:"theme"`
	Features    map[string]bool        `json:"features"`
}

func main() {
	if len(os.Args) != 2 {
		fmt.Println(`{"error": "Username required"}`)
		os.Exit(1)
	}

	pythonCmd := "python3"
	if runtime.GOOS == "windows" {
		pythonCmd = "python"
	}

	cwd, err := os.Getwd()
	if err != nil {
		fmt.Printf(`{"error": "%s"}`, err)
		os.Exit(1)
	}

	pythonScript := filepath.Join(cwd, "src", "app", "api", "python", "e-z.py")

	output, err := exec.Command(pythonCmd, pythonScript, os.Args[1]).Output()
	if err != nil {
		fmt.Printf(`{"error": "Failed to execute Python script: %s"}`, err)
		os.Exit(1)
	}

	var userData UserData
	if err := json.Unmarshal(output, &userData); err != nil {
		fmt.Printf(`{"error": "Failed to unmarshal data: %s"}`, err)
		os.Exit(1)
	}

	fmt.Println(string(output))
}
