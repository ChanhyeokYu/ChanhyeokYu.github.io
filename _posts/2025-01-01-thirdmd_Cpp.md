---
title: "json parser 사용 및 매니저를 이용한 관리"
date: "2025-01-01"
last_modified_at: "2025-01-01"
---

```cpp
#include "pch.h"
#include "ReadingManager.h"
#include <fstream>
#include "json.hpp"

using namespace nlohmann;

void ReadingManager::OpenFile()
{
	SetConsoleOutputCP(CP_UTF8);
	ifstream file("test.json", ios::in);

	if (!file.is_open())
	{
		cerr << "Error open!";
	}
	
	json j;
	file >> j;

	map<string, string> word_map;
	for (const auto& result : j["results"])
	{
		word_map[result["Wording"].get<string>()] = result["Wordresult"].get<string>();
	}

	for (const auto& pair : word_map)
	{
		cout << pair.first << ": " << pair.second << "\n";
	}

	file.close();
}

```

- json을 사용하는 이유

  sequence를 사용한 대사 출력 및 이벤트 내용 출력에 사용

#### Readmanager를 사용한 텍스트 관리

```cpp
#pragma once
class ReadingManager
{
public:
	DECLARE_SINGLE(ReadingManager);
public:

	void OpenFile();
};
```

- 매니저 사용 이유
  - 매니저를 통해 일관된 관리와 동시에 싱글톤 사용으로 해당 매니저의 인스턴스 낭비를 줄여 메모리 관리