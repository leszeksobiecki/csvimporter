package com.example.sourcery2023;

import com.univocity.parsers.common.record.Record;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;



@RestController
public class MyController {

    @Autowired
    private EmployeeRepository service;

    @PostMapping("/upload")
    public String uploadData(@RequestParam("file") MultipartFile file) throws IOException{
        List<Employee> employeeList = new ArrayList<>();
        InputStream inputStream = file.getInputStream();
        CsvParserSettings settings = new CsvParserSettings();
        settings.setHeaderExtractionEnabled(true);
        settings.setLineSeparatorDetectionEnabled(true);
        settings.setDelimiterDetectionEnabled(true);
        CsvParser parser = new CsvParser(settings);
        List<Record> parsedRecords = parser.parseAllRecords(inputStream);
        parsedRecords.forEach(record -> {
            Employee employee = new Employee();
            employee.setName(record.getString("Name"));
            employee.setEmail(record.getString("Email"));
            employee.setPhoneNumber(record.getString("PhoneNumber"));
            employeeList.add(employee);
        });
        service.saveAll(employeeList);
        return "Upload successful!";
    }

    @GetMapping("/list")
    public Iterable<Employee> getEmployees() {
        return service.findAll();
    }
}
