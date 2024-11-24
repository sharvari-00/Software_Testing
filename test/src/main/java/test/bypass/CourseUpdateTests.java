package test.bypass;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import io.github.bonigarcia.wdm.WebDriverManager;

import java.time.Duration;

public class CourseUpdateTests {

    private static final String LOGIN_URL = "http://localhost:3000/login";
    private static final String COURSES_URL = "http://localhost:3000/courses";

    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            // Perform login
            login(driver);

            // Run all test cases
            testValidCourseUpdate(driver);
            testEmptyFields(driver);
            testInvalidInput(driver);
            testSpecialCharacters(driver);
            testMaxLengthInput(driver);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }

    public static void login(WebDriver driver) {
        driver.get(LOGIN_URL);

        // Enter valid login details
        WebElement emailField = driver.findElement(By.id("name"));
        WebElement passwordField = driver.findElement(By.id("password"));
        WebElement loginButton = driver.findElement(By.xpath("//button[@type='submit']"));

        emailField.sendKeys("bhumika@gmail.com");
        passwordField.sendKeys("password");
        loginButton.click();

        // Wait for successful login
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.urlToBe(COURSES_URL));
    }

    public static void testValidCourseUpdate(WebDriver driver) {
        System.out.println("Running: Valid Course Update Test");
        driver.get(COURSES_URL);

        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

            // Click the "Edit" button
            WebElement editButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(@aria-label, 'Edit course')]")));
            editButton.click();

            // Wait for the update form
            WebElement courseNameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("Course_Name")));
            WebElement courseCodeField = driver.findElement(By.id("Course_Code"));
            WebElement creditsField = driver.findElement(By.id("Credits"));
            WebElement capacityField = driver.findElement(By.id("Capacity"));
            WebElement yearField = driver.findElement(By.id("Year"));
            WebElement termField = driver.findElement(By.id("Term"));

            // Clear and update fields
            clearField(driver, courseNameField);
            clearField(driver, courseCodeField);
            clearField(driver, creditsField);
            clearField(driver, capacityField);
            clearField(driver, yearField);
            clearField(driver, termField);

            courseNameField.sendKeys("Updated Course Name");
            courseCodeField.sendKeys("CS502");
            creditsField.sendKeys("4");
            capacityField.sendKeys("200");
            yearField.sendKeys("2025");
            termField.sendKeys("Spring");

            System.out.println("Valid Course Update Test Passed");
        } catch (Exception e) {
            System.out.println("Valid Course Update Test Failed");
            e.printStackTrace();
        }
    }

    public static void testEmptyFields(WebDriver driver) {
        System.out.println("Running: Empty Fields Test");
        driver.get(COURSES_URL);

        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

            // Click the "Edit" button
            WebElement editButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(@aria-label, 'Edit course')]")));
            editButton.click();

            // Wait for the update form
            WebElement updateButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(text(), 'Update')]")));

            // Submit form without entering any data
            updateButton.click();

            // Verify error message
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(), 'Can't be empty')]")));
            System.out.println("Empty Fields Test Passed");
        } catch (Exception e) {
            System.out.println("Empty Fields Test Failed");
            e.printStackTrace();
        }
    }

    public static void testInvalidInput(WebDriver driver) {
        System.out.println("Running: Invalid Input Test");
        driver.get(COURSES_URL);

        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

            // Click the "Edit" button
            WebElement editButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(@aria-label, 'Edit course')]")));
            editButton.click();

            // Wait for the update form
            WebElement creditsField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("Credits")));

            // Enter invalid data (e.g., letters in numeric fields)
            clearField(driver, creditsField);
            creditsField.sendKeys("invalid_data");

            // Submit the form
            WebElement updateButton = driver.findElement(By.xpath("//button[contains(text(), 'Update')]"));
            updateButton.click();

            // Verify error message
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(), 'Invalid input')]")));
            System.out.println("Invalid Input Test Passed");
        } catch (Exception e) {
            System.out.println("Invalid Input Test Failed");
            e.printStackTrace();
        }
    }

    public static void testSpecialCharacters(WebDriver driver) {
        System.out.println("Running: Special Characters Test");
        driver.get(COURSES_URL);

        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

            // Click the "Edit" button
            WebElement editButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(@aria-label, 'Edit course')]")));
            editButton.click();

            // Wait for the update form
            WebElement courseNameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("Course_Name")));

            // Enter special characters
            clearField(driver, courseNameField);
            courseNameField.sendKeys("!@#$%^&*()");

            // Submit the form
            WebElement updateButton = driver.findElement(By.xpath("//button[contains(text(), 'Update')]"));
            updateButton.click();

            // Verify error message or accept valid input
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(), 'Course updated successfully')]")));
            System.out.println("Special Characters Test Passed");
        } catch (Exception e) {
            System.out.println("Special Characters Test Failed");
            e.printStackTrace();
        }
    }

    public static void testMaxLengthInput(WebDriver driver) {
        System.out.println("Running: Max Length Input Test");
        driver.get(COURSES_URL);

        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

            // Click the "Edit" button
            WebElement editButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(@aria-label, 'Edit course')]")));
            editButton.click();

            // Wait for the update form
            WebElement courseNameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("Course_Name")));

            // Enter maximum length string
            clearField(driver, courseNameField);
            courseNameField.sendKeys("A".repeat(256)); // Assuming max length is 255

            // Submit the form
            WebElement updateButton = driver.findElement(By.xpath("//button[contains(text(), 'Update')]"));
            updateButton.click();

            // Verify error message
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(), 'Input exceeds max length')]")));
            System.out.println("Max Length Input Test Passed");
        } catch (Exception e) {
            System.out.println("Max Length Input Test Failed");
            e.printStackTrace();
        }
    }

    private static void clearField(WebDriver driver, WebElement field) {
        field.click();
        field.sendKeys(Keys.CONTROL + "a");
        field.sendKeys(Keys.BACK_SPACE);
    }
}
