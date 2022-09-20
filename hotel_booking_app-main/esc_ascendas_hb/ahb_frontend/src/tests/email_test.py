# 3 tests- valid email 
# invalid boundary 
# invalid middle 

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
import random
import string

 # inherit TestCase Class and create a new test class
class autocompleteTest(unittest.TestCase):
 
    # initialization of webdriver
    def setUp(self):
        s=Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=s)
        
 
    # Test case method. It should always start with test_
    #valid middle value - pj@hotmail.com
    def test_exact_dest(self):
        is_clickable = False
        driver = self.driver
        driver.get("http://localhost:3000")
        e = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[1]/div/input[2]")
        e.send_keys(("Singapore, Singapore (SIN-Changi)"))
        time.sleep(2) 
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[2]/div/div/div[1]"))).click()
        choose_date= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/button").click()
        check_in_date= driver.find_element("xpath", "/html/body/div/div/div/div/div/div[1]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/div[2]/div[3]/div[7]")
        check_in_date.click()
        check_in= check_in_date.text
        print(check_in_date.text.split())
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[3]/div/div/div[1]/button"))).click()
        check_out_date= driver.find_element("xpath", "/html/body/div/div/div/div/div/div[1]/div/div/div[3]/div/div/div[2]/div/div/div[2]/div/div[2]/div[4]/div[1]")
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button"))).click()
    
        
        
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button"))).click()
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[3]/ul/div[1]/div/div/div[2]/button"))).click()
        time.sleep(2)
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[3]/ul/div[1]/div/div/div[3]/a/button"))).click()
        time.sleep(6)
        element=driver.find_element("xpath","/html/body/div/div/div/div/div[4]/div/div/div/div[2]/div/div[1]/div[2]/div/div[4]/a/button")
        driver.execute_script("arguments[0].scrollIntoView();", element)
        time.sleep(3)
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div[4]/div/div/div/div[2]/div/div[1]/div[2]/div/div[4]/a/button"))).click()
        time.sleep(2)
        name= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[2]/div[1]/div/input")
        phone_number= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[2]/div[2]/div/input")
        address= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[3]/div/div/input")
        email= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[4]/div/div/input")
        message = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[5]/div/div/textarea")
        card_num = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[3]/div[1]/div/input")
        card_name= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[3]/div[2]/div/input")
        date= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[4]/div[1]/div/input")
        cvv = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[4]/div[2]/div/input")
        submit_booking= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[5]/button")
        it= random.randint(1,3)
        randomemail = ''.join(random.choice(string.ascii_letters) for _ in range(6))+"@gmail.com"
        name.send_keys(("JP"))
        time.sleep(1)
        phone_number.send_keys((3883838383))
        time.sleep(1)
        address.send_keys(("Landmine Road"))
        time.sleep(1)
        email.send_keys((randomemail))
        time.sleep(1)
        message.send_keys(("Extra Bed"))
        time.sleep(1)
        date.send_keys(("12/22"))
        time.sleep(1)
        card_name.send_keys(("PARWANI JAYATI"))
        time.sleep(1)
        card_num.send_keys((6000000000000000))
        time.sleep(1)
        cvv.send_keys((2222))
        time.sleep(5)
        try:
                submit_booking.click()
                time.sleep(2)
                print("BookingSubmitted")
                is_clickable = True

        except:
                print("Button Cannot be submitted")
        self.assertTrue(is_clickable)











# try:
#     driver.find_element(By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button")
# except NoSuchElementException:
#     is_clickable=False

#href_data = button.get_attribute('href')
#print(href_data)
# WebDriverWait(driver, 1000).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button"))).click()
# #if href_data is None:
#     #is_clickable = False
# print(is_clickable)


# assertion to confirm a search button is there- i.e a valid destination has been chosen in dropbox
    
 
    # cleanup method called after every test performed
    def tearDown(self):
        self.driver.close()
    
    #invalid boundary value "mp@"
    def test_incomplete_dest(self):
        
        is_clickable = False
        driver = self.driver
        driver.get("http://localhost:3000")
        e = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[1]/div/input[2]")
        e.send_keys(("Singapore, Singapore (SIN-Changi)"))
        time.sleep(2) 
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[2]/div/div/div[1]"))).click()
        choose_date= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/button").click()
        check_in_date= driver.find_element("xpath", "/html/body/div/div/div/div/div/div[1]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/div[2]/div[3]/div[7]")
        check_in_date.click()
        check_in= check_in_date.text
        print(check_in_date.text.split())
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[3]/div/div/div[1]/button"))).click()
        check_out_date= driver.find_element("xpath", "/html/body/div/div/div/div/div/div[1]/div/div/div[3]/div/div/div[2]/div/div/div[2]/div/div[2]/div[4]/div[1]")
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button"))).click()
    
        
        
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button"))).click()
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[3]/ul/div[1]/div/div/div[2]/button"))).click()
        time.sleep(2)
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[3]/ul/div[1]/div/div/div[3]/a/button"))).click()
        time.sleep(6)
        element=driver.find_element("xpath","/html/body/div/div/div/div/div[4]/div/div/div/div[2]/div/div[1]/div[2]/div/div[4]/a/button")
        driver.execute_script("arguments[0].scrollIntoView();", element)
        time.sleep(3)
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div[4]/div/div/div/div[2]/div/div[1]/div[2]/div/div[4]/a/button"))).click()
        time.sleep(2)
        name= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[2]/div[1]/div/input")
        phone_number= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[2]/div[2]/div/input")
        address= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[3]/div/div/input")
        email= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[4]/div/div/input")
        message = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[5]/div/div/textarea")
        card_num = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[3]/div[1]/div/input")
        card_name= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[3]/div[2]/div/input")
        date= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[4]/div[1]/div/input")
        cvv = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[4]/div[2]/div/input")
        submit_booking= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[5]/button")
        it= random.randint(1,3)
        randomemail = ''.join(random.choice(string.ascii_letters) for _ in range(6))+"@gmail.com"
        name.send_keys(("JP"))
        time.sleep(1)
        phone_number.send_keys((3883838383))
        time.sleep(1)
        address.send_keys(("Landmine Road"))
        time.sleep(1)
        email.send_keys(("hfgh@"))
        time.sleep(1)
        message.send_keys(("Extra Bed"))
        time.sleep(1)
        date.send_keys(("12/22"))
        time.sleep(1)
        card_name.send_keys(("PARWANI JAYATI"))
        time.sleep(1)
        card_num.send_keys((6000000000000000))
        time.sleep(1)
        cvv.send_keys((2222))
        time.sleep(5)
        try:
                submit_booking.click()
                time.sleep(2)
                print("BookingSubmitted")
                is_clickable = True

        except:
                print("Button Cannot be submitted")
        self.assertFalse(is_clickable)

 
    # cleanup method called after every test performed
    def cleanUp(self):
        self.driver.close()
        
    #inavlid boundary value "@gmail.com"
    def test_wrong_dest(self):
        
        is_clickable = False
        driver = self.driver
        driver.get("http://localhost:3000")
        e = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[1]/div/input[2]")
        e.send_keys(("Singapore, Singapore (SIN-Changi)"))
        time.sleep(2) 
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[1]/div/div/div[2]/div/div/div[1]"))).click()
        choose_date= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/div/div[2]/div/div/div[1]/button").click()
        check_in_date= driver.find_element("xpath", "/html/body/div/div/div/div/div/div[1]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/div[2]/div[3]/div[7]")
        check_in_date.click()
        check_in= check_in_date.text
        print(check_in_date.text.split())
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[3]/div/div/div[1]/button"))).click()
        check_out_date= driver.find_element("xpath", "/html/body/div/div/div/div/div/div[1]/div/div/div[3]/div/div/div[2]/div/div/div[2]/div/div[2]/div[4]/div[1]")
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button"))).click()
    
        
        
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[1]/div/div/div[7]/a/button"))).click()
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[3]/ul/div[1]/div/div/div[2]/button"))).click()
        time.sleep(2)
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div/div[3]/ul/div[1]/div/div/div[3]/a/button"))).click()
        time.sleep(6)
        element=driver.find_element("xpath","/html/body/div/div/div/div/div[4]/div/div/div/div[2]/div/div[1]/div[2]/div/div[4]/a/button")
        driver.execute_script("arguments[0].scrollIntoView();", element)
        time.sleep(3)
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div/div/div[4]/div/div/div/div[2]/div/div[1]/div[2]/div/div[4]/a/button"))).click()
        time.sleep(2)
        name= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[2]/div[1]/div/input")
        phone_number= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[2]/div[2]/div/input")
        address= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[3]/div/div/input")
        email= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[4]/div/div/input")
        message = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[2]/div/div[5]/div/div/textarea")
        card_num = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[3]/div[1]/div/input")
        card_name= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[3]/div[2]/div/input")
        date= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[4]/div[1]/div/input")
        cvv = driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[4]/div[2]/div/input")
        submit_booking= driver.find_element("xpath","/html/body/div/div/div/div/div/div[1]/div/form/div[3]/div/div[5]/button")
        it= random.randint(1,3)
        randomemail = ''.join(random.choice(string.ascii_letters) for _ in range(6))+"@gmail.com"
        name.send_keys(("JP"))
        time.sleep(1)
        phone_number.send_keys((3883838383))
        time.sleep(1)
        address.send_keys(("Landmine Road"))
        time.sleep(1)
        email.send_keys(("@gmail.com"))
        time.sleep(1)
        message.send_keys(("Extra Bed"))
        time.sleep(1)
        date.send_keys(("12/22"))
        time.sleep(1)
        card_name.send_keys(("PARWANI JAYATI"))
        time.sleep(1)
        card_num.send_keys((6000000000000000))
        time.sleep(1)
        cvv.send_keys((2222))
        time.sleep(5)
        try:
                submit_booking.click()
                time.sleep(2)
                print("BookingSubmitted")
                is_clickable = True

        except:
                print("Button Cannot be submitted")
        self.assertFalse(is_clickable)
 
    # cleanup method called after every test performed
    def clean_driver(self):
        self.driver.close()
 
# execute the script
if __name__ == "__main__":
    unittest.main()