import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from soupsieve import select
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException

import random
import string


# s=Service(ChromeDriverManager().install())
# driver = webdriver.Chrome(service=s)
# #driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
# driver.maximize_window()


class autocompleteTest(unittest.TestCase):
    def setUp(self):
        s=Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=s)
    def test_handle(self):
        driver= self.driver
        driver.get("http://localhost:3000/handlebooking")
        letters = string.ascii_lowercase
        iterations= random.randint(0, 5)
        count=0
        for i in range(iterations):
            length= random.randint(0, 9)
            result_str = ''.join(random.choice(letters) for i in range(length))
            e = driver.find_element("xpath","/html/body/div/div/div/div/form/div/div/div[2]/div/div/input")
            e.send_keys((result_str))
            time.sleep(2) 
            WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, " /html/body/div/div/div/div/form/div/div/div[3]/div/button"))).click()
            try:
                driver.find_element(By.XPATH, "/html/body/div/div/div/form/div")
            except NoSuchElementException:
                print("Cannot find booking")
                count+=1
                e.clear()

        print(count)
        print(iterations)
        
        self.assertEqual(count,iterations)
    def clean_driver(self):
        self.driver.close()
        
    def test_valid(self):
        driver= self.driver
        isclick= False
        driver.get("http://localhost:3000/handlebooking")
        letters = string.ascii_lowercase
        e = driver.find_element("xpath","/html/body/div/div/div/div/form/div/div/div[2]/div/div/input")
        e.send_keys(("f4e7a599-9e23-4e20-93de-4d99df36dae1"))
        time.sleep(2) 
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/form/div/div/div[3]/div/button"))).click()
        time.sleep(5)
        try:
            driver.find_element(By.XPATH, "/html/body/div/div/div/form/div/div/div/div")
            isclick= True
        except NoSuchElementException:
            print("Cannot find booking")
            e.clear()
        self.assertTrue(isclick)
    
    # def clean(self):
    #     self.driver.close()
        
    # def tearDown(self):
    #     self.driver.close()
        
if __name__ == "__main__":
    unittest.main()
                
                

            





        
 