package com.example.bhumika.jindal.academic_erp.Controllers;

import java.lang.management.ManagementFactory;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@RestController
@RequestMapping("/api/test")
public class TestLayer {

	@GetMapping("/ping")
	public ResponseEntity<Object> isupEndpoint() {
		Map<String, String> data = new LinkedHashMap<>();
		data.put("status", "OK");
		data.put("message", "server is up and running");
		return new ResponseEntity<>(data, HttpStatus.OK);
	}

	@GetMapping("/serverDetails")
	public ResponseEntity<Object> serverDetailsEndpoint() {
		Map<String, Object> serverDetails = new LinkedHashMap<>();
		long uptimeInSeconds = ManagementFactory.getRuntimeMXBean().getUptime() / 1000;
		serverDetails.put("uptime", uptimeInSeconds + " seconds");
		long responseTimeMillis = getResponseTime();
		serverDetails.put("responseTime", responseTimeMillis + " milliseconds");
		return new ResponseEntity<>(serverDetails, HttpStatus.OK);
	}

	private long getResponseTime() {
		long startTime = System.currentTimeMillis();
		long endTime = System.currentTimeMillis();
		return endTime - startTime;
	}

}
