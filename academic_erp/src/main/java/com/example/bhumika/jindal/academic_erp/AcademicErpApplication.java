package com.example.bhumika.jindal.academic_erp;

import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.bhumika.jindal.academic_erp.Filters.ApiKeyCheck;

@SpringBootApplication
public class AcademicErpApplication {

    public static void main(String[] args) {
        SpringApplication.run(AcademicErpApplication.class, args);
    }

    // @Bean
    // public FilterRegistrationBean<ApiKeyCheck> apiKeyFilter() {
    //     FilterRegistrationBean<ApiKeyCheck> registrationBean = new FilterRegistrationBean<>();
    //     registrationBean.setFilter(new ApiKeyCheck());
    //     registrationBean.addUrlPatterns("/api/*");
    //     return registrationBean;
    // }

    @Configuration
    @EnableWebMvc
    public class WebConfig implements WebMvcConfigurer {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/api/**")
                    .allowedOriginPatterns("*")
                    .allowedMethods("*")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
        }

        // @Override
        // public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        //     converters.add(new MappingJackson2HttpMessageConverter());
        //     converters.add(new StringHttpMessageConverter(StandardCharsets.UTF_8));
        // }
    }
}
