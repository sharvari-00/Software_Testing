package test.bypass;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class LoginTests {

    public static WebDriver driver;

    public static void main(String[] args) {
        // Setup ChromeDriver using WebDriverManager
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();

        try {
            // Run all tests sequentially
            testInvalidLogin();
            testEmptyFields();
            testSQLInjection();
            testXSS();
            testLongInput();
            testValidLogin();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit(); // Close the browser after all tests
        }
    }

    public static void testValidLogin() throws InterruptedException {
        System.out.println("Running: Valid Login Test");
        driver.get("http://localhost:3000/login");
        driver.findElement(By.id("name")).sendKeys("bhumika@gmail.com");
        driver.findElement(By.id("password")).sendKeys("password");
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        Thread.sleep(2000);

        if (driver.getPageSource().contains("Dashboard")) {
            System.out.println("Valid Login Test Passed");
        } else {
            System.out.println("Valid Login Test Failed");
        }
    }

    public static void testInvalidLogin() throws InterruptedException {
        System.out.println("Running: Invalid Login Test");
        driver.get("http://localhost:3000/login");
        driver.findElement(By.id("name")).sendKeys("invalid@example.com");
        driver.findElement(By.id("password")).sendKeys("wrongpassword");
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        Thread.sleep(2000);

        if (driver.getPageSource().contains("Invalid credentials")) {
            System.out.println("Invalid Login Test Passed");
        } else {
            System.out.println("Invalid Login Test Failed");
        }
    }

    public static void testEmptyFields() throws InterruptedException {
        System.out.println("Running: Empty Fields Test");
        driver.get("http://localhost:3000/login");
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        Thread.sleep(2000);

        if (driver.getPageSource().contains("email is required")) {
            System.out.println("Empty Fields Test Passed");
        } else {
            System.out.println("Empty Fields Test Failed");
        }
    }

    public static void testSQLInjection() throws InterruptedException {
        System.out.println("Running: SQL Injection Test");
        driver.get("http://localhost:3000/login");
        driver.findElement(By.id("name")).sendKeys("' OR 1=1--");
        driver.findElement(By.id("password")).sendKeys("random");
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        Thread.sleep(2000);

        if (driver.getPageSource().contains("Dashboard")) {
            System.out.println("SQL Injection Test Failed: Vulnerable");
        } else {
            System.out.println("SQL Injection Test Passed: Not Vulnerable");
        }
    }

    public static void testXSS() throws InterruptedException {
        System.out.println("Running: Cross-Site Scripting (XSS) Test");
        driver.get("http://localhost:3000/login");
        driver.findElement(By.id("name")).sendKeys("<script>alert('XSS')</script>");
        driver.findElement(By.id("password")).sendKeys("random");
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        Thread.sleep(2000);

        if (!driver.getPageSource().contains("alert")) {
            System.out.println("XSS Test Passed: Not Vulnerable");
        } else {
            System.out.println("XSS Test Failed: Vulnerable");
        }
    }

    public static void testLongInput() throws InterruptedException {
        System.out.println("Running: Long Input Test");
        String longString = "a".repeat(5000);
        driver.get("http://localhost:3000/login");
        driver.findElement(By.id("name")).sendKeys(longString);
        driver.findElement(By.id("password")).sendKeys(longString);
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        Thread.sleep(2000);

        if (!driver.getPageSource().contains("error")) {
            System.out.println("Long Input Test Passed");
        } else {
            System.out.println("Long Input Test Failed");
        }
    }
}
