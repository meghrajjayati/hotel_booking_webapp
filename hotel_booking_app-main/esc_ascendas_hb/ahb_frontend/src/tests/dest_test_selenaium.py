import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from soupsieve import select
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException

 # inherit TestCase Class and create a new test class
class autocompleteTest(unittest.TestCase):
 
    # initialization of webdriver
    def setUp(self):
        s=Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=s)
 
    # Test case method. It should always start with test_
    def test_exact_dest(self):
        # get driver
        driver = self.driver
        is_clickable=True 
        # get python.org using selenium
        driver.get("http://localhost:3000")
        e = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[1]/div/input[2]")
        e.send_keys(("Singapore, Singapore (SIN-Changi)"))
        time.sleep(2) 
        WebDriverWait(driver, 1000).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[2]/div/div/div[1]"))).click()
        button = driver.find_element(By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button")
        try:
            driver.find_element(By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button")
        except NoSuchElementException:
            is_clickable=False
        
        #href_data = button.get_attribute('href')
        #print(href_data)
        WebDriverWait(driver, 1000).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button"))).click()
        #if href_data is None:
            #is_clickable = False
        print(is_clickable)

 
        # assertion to confirm a search button is there- i.e a valid destination has been chosen in dropbox
        self.assertTrue(is_clickable)
 
    # cleanup method called after every test performed
    def tearDown(self):
        self.driver.close()
    
    def test_incomplete_dest(self):
        
        # get driver
        driver = self.driver
        is_clickable=True
        # get python.org using selenium
        driver.get("http://localhost:3000")
        e = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[1]/div/input[2]")
        e.send_keys(("Changi"))
        time.sleep(2) 
        WebDriverWait(driver, 1000).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[2]/div/div/div[1]"))).click()
        button = driver.find_element(By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button")
        try:
            driver.find_element(By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button")
        except NoSuchElementException:
            is_clickable=False
        
        #href_data = button.get_attribute('href')
        #print(href_data)
        WebDriverWait(driver, 1000).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button"))).click()
        #if href_data is None:
            #is_clickable = False
        print(is_clickable)

 
        # assertion to confirm a search button is there- i.e a valid destination has been chosen in dropbox
        self.assertTrue(is_clickable)
 
    # cleanup method called after every test performed
    def cleanUp(self):
        self.driver.close()
        
    
    def test_wrong_dest(self):
        
        # get driver
        driver = self.driver
        is_clickable=True
        # get python.org using selenium
        driver.get("http://localhost:3000")
        e = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[1]/div/input[2]")
        e.send_keys(("yyyyy"))
        time.sleep(2) 
        WebDriverWait(driver, 1000).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[2]/div/div/div[1]"))).click()
        try:
            driver.find_element(By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button")
        except NoSuchElementException:
            is_clickable=False
        
        #href_data = button.get_attribute('href')
        #print(href_data)
        #WebDriverWait(driver, 1000).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button"))).click()
        #if href_data is None:
            #is_clickable = False
        print(is_clickable)

 
        # assertion to confirm a search button is there- i.e a valid destination has been chosen in dropbox
        self.assertFalse(is_clickable)
 
    # cleanup method called after every test performed
    def clean_driver(self):
        self.driver.close()
 
# execute the script
if __name__ == "__main__":
    unittest.main()