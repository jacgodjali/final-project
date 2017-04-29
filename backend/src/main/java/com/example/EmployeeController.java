package com.example;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping(value="/employee")
public class EmployeeController {

	@Autowired
	private EmployeeRepository repository;
	@Autowired
	private LocationRepository locRepository;
	@Autowired
	private ObjectMapper mapper;
	
	@PostMapping("/add")
	@CrossOrigin(origins = "http://localhost:4200")
	@ResponseBody
	public void addEmployee(@RequestBody String jsonObj)
	{
		mapper.setDateFormat(new SimpleDateFormat("yyyy/MM/dd"));
		Employee e;
		System.out.println(jsonObj);
		try {
			e = mapper.readValue(jsonObj, Employee.class);
			Location loc = locRepository.findByCityAllIgnoreCase(e.getLocation().getCity());
			e.setLocation(loc);
			this.repository.save(e);
		} catch (IOException e1) {
			e1.printStackTrace();
		}
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/findByName")
	@ResponseBody
	public List<Employee> findByName(@RequestParam() String name)
	{
		return this.repository.findByLastNameContainingOrFirstNameContainingAllIgnoreCase(name, name);
	}
	
	@GetMapping("/filterGender")
	@CrossOrigin(origins = "http://localhost:4200")
	@ResponseBody
	public Iterable<Employee> filterEmployeeByGender(@RequestParam() String gender)
	{
			return this.repository.findByGenderAllIgnoreCase(gender);
	}
	
	@GetMapping("/filterLocation")
	@CrossOrigin(origins = "http://localhost:4200")
	@ResponseBody
	public Iterable<Employee> filterEmployeeByLocation(@RequestParam() String location)
	{
			return this.repository.findByLocationCityAllIgnoreCase(location);
	}
	@GetMapping("/filterLocationAndGender")
	@CrossOrigin(origins = "http://localhost:4200")
	@ResponseBody
	public Iterable<Employee> filterEmployeeByLocationAndGender(@RequestParam() String location, 
			@RequestParam() String gender)
	{
		System.out.println(location);
		System.out.println(gender);
			return this.repository.findByLocationCityAndGenderAllIgnoreCase(location, gender);
	}
	
	
	@GetMapping("/getAll")
	@CrossOrigin(origins = "http://localhost:4200")
	@ResponseBody
	public Iterable<Employee> getAllEmployee()
	{
		Sort.Order sorting = new Sort.Order(Sort.Direction.ASC, "lastName").ignoreCase();
		return this.repository.findAll(new Sort(sorting));

	}
	
	@RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH}, value="/update/{employeeId}")
	public void update(@PathVariable Long employeeId, @RequestBody Employee emp) {
		Employee entity = this.repository.findOne(employeeId);
		if (entity == null) {
			throw new EmployeeNotFoundException();
		}
		else{
			entity = emp;
			entity.setEmpId(employeeId);
			try {
				entity.setDateOfBirth(new SimpleDateFormat("yyyy/MM/dd").parse(emp.getDateOfBirth().toString()));
				entity.setSuspendDate(new SimpleDateFormat("yyyy/MM/dd").parse(emp.getSuspendDate().toString()));
				entity.setHiredDate(new SimpleDateFormat("yyyy/MM/dd").parse(emp.getHiredDate().toString()));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			this.repository.save(entity);
		}
		
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/delete/{id}")
	public Long deleteEmployeeById(@PathVariable Long id) {
		this.repository.delete(id);
		return id;
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/getById/{id}")
	public Employee getEmployeeById(@PathVariable Long id) {
		return this.repository.findOne(id);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/sortBy/{sort}")
	public Iterable<Employee> sorting(@PathVariable String sort) {
		if(sort.equalsIgnoreCase("ascend")) {
			Sort.Order sorted = new Sort.Order(Sort.Direction.ASC, "lastName").ignoreCase();
			return this.repository.findAll(new Sort(sorted));
		}
		
		else if(sort.equalsIgnoreCase("descend")) {
			Sort.Order sorted = new Sort.Order(Sort.Direction.DESC, "lastName").ignoreCase();
			return this.repository.findAll(new Sort(sorted));
		}
		
		return this.repository.findAll();
		
	}

}
