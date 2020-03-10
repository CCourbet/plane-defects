from rest_framework import status
from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

from api.models import MaintenanceState, Defect


class MaintenanceTest(APITestCase):
    url_maintenance = reverse('maintenance')
    url_auth = reverse('login')

    def setUp(self):
        self.username = 'test1'
        self.password = 'test1_password'
        self.user = {
            'username': self.username,
            'password': self.password
        }
        # Create maintenance state
        maintenance_state = MaintenanceState.objects.create(id=1, is_maintenance=True)
        self.assertEqual(maintenance_state.is_maintenance, True)

    def test_admin_get_post_maintenance_state(self):
        # Create a user
        user = User.objects.create_user(username='test1', email='test@mail.com', password='test1_password',
                                        is_staff=True)
        self.assertEqual(user.is_active, 1, 'Active User')
        # Post to get token
        response = self.client.post(self.url_auth, self.user, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT {0}'.format(token))
        # Post maintenance state
        response = self.client.post(self.url_maintenance, {'is_maintenance': True}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Get maintenance state
        response = self.client.get(self.url_maintenance)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(MaintenanceState.objects.count(), 1)
        print(MaintenanceState.objects)

    def test_user_get_post_maintenance_state(self):
        # Create a user
        user = User.objects.create_user(username='test1', email='test@mail.com', password='test1_password',
                                        is_staff=False)
        self.assertEqual(user.is_active, 1, 'Active User')
        # Post to get token
        response = self.client.post(self.url_auth, self.user, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT {0}'.format(token))
        # Post maintenance state
        response = self.client.post(self.url_maintenance, {'is_maintenance': True}, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        # Get maintenance state
        response = self.client.get(self.url_maintenance)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class DefectWithoutMaintenanceTest(APITestCase):
    url_defect_list = reverse('defect-list')
    url_auth = reverse('login')
    url_maintenance = reverse('maintenance')

    def setUp(self):
        self.username = 'test'
        self.password = 'test_password'
        self.user = {
            'username': self.username,
            'password': self.password
        }
        self.defect = {
            'xcoordinate': 562,
            'ycoordinate': 16,
            'zcoordinate': 0,
            'defecttype': 'P',
            'comment': 'test'
        }
        self.defect_wrong = {
            'xcoordinate': 263,
            'ycoordinate': 16,
            'zcoordinate': 0,
            'defecttype': 'P',
            'comment': 'test'
        }
        # Create maintenance state
        maintenance_state = MaintenanceState.objects.create(id=1, is_maintenance=False)
        self.assertEqual(maintenance_state.is_maintenance, False)

    def test_admin_post_defect(self):
        # Create a user
        user = User.objects.create_user(username='test', email='test@mail.com', password='test_password', is_staff=True)
        self.assertEqual(user.is_active, 1, 'Active User')
        # Post to get token
        response = self.client.post(self.url_auth, self.user, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT {0}'.format(token))
        # Post maintenance state
        response = self.client.post(self.url_maintenance, {'is_maintenance': False}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Post defect
        defect = Defect.objects.create(
            xcoordinate=562,
            ycoordinate=16,
            zcoordinate=0,
            defecttype='P',
            comment='test'
        )
        self.assertEqual(defect.xcoordinate, 562)
        response = self.client.post(self.url_defect_list, self.defect, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_post_defect_maintenance_false(self):
        # Create a user
        user = User.objects.create_user(username='test', email='test@mail.com', password='test_password',
                                        is_staff=False)
        self.assertEqual(user.is_active, 1, 'Active User')
        # Post to get token
        response = self.client.post(self.url_auth, self.user, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT {0}'.format(token))
        # Post defect
        defect = Defect.objects.create(
            xcoordinate=562,
            ycoordinate=16,
            zcoordinate=0,
            defecttype='P',
            comment='test'
        )
        self.assertEqual(defect.xcoordinate, 562)
        response = self.client.post(self.url_defect_list, self.defect, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_post_wrong_format_defect(self):
        # Create a user
        user = User.objects.create_user(username='test', email='test@mail.com', password='test_password',
                                        is_staff=False)
        self.assertEqual(user.is_active, 1, 'Active User')
        # Post to get token
        response = self.client.post(self.url_auth, self.user, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT {0}'.format(token))
        # Post defect
        defect = Defect.objects.create(
            xcoordinate=263,
            ycoordinate=16,
            zcoordinate=0,
            defecttype='P',
            comment='test'
        )
        self.assertEqual(defect.xcoordinate, 263)
        response = self.client.post(self.url_defect_list, self.defect_wrong, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DefectWithMaintenanceTest(APITestCase):
    url_defect_list = reverse('defect-list')
    url_auth = reverse('login')
    url_maintenance = reverse('maintenance')

    def setUp(self):
        self.username = 'test'
        self.password = 'test_password'
        self.user = {
            'username': self.username,
            'password': self.password
        }
        self.defect = {
            'xcoordinate': 562,
            'ycoordinate': 16,
            'zcoordinate': 0,
            'defecttype': 'P',
            'comment': 'test'
        }
        # Create maintenance state
        maintenance_state = MaintenanceState.objects.create(id=1, is_maintenance=True)
        self.assertEqual(maintenance_state.is_maintenance, True)

    def test_admin_post_defect(self):
        # Create a user
        user = User.objects.create_user(username='test', email='test@mail.com', password='test_password', is_staff=True)
        self.assertEqual(user.is_active, 1, 'Active User')
        # Post to get token
        response = self.client.post(self.url_auth, self.user, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT {0}'.format(token))
        # Post maintenance state
        response = self.client.post(self.url_maintenance, {'is_maintenance': True}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Post defect
        defect = Defect.objects.create(
            xcoordinate=562,
            ycoordinate=16,
            zcoordinate=0,
            defecttype='P',
            comment='test'
        )
        self.assertEqual(defect.xcoordinate, 562)
        response = self.client.post(self.url_defect_list, self.defect, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_post_defect_maintenance_false(self):
        # Create a user
        user = User.objects.create_user(username='test', email='test@mail.com', password='test_password',
                                        is_staff=False)
        self.assertEqual(user.is_active, 1, 'Active User')
        # Post to get token
        response = self.client.post(self.url_auth, self.user, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='JWT {0}'.format(token))
        # Post defect
        defect = Defect.objects.create(
            xcoordinate=562,
            ycoordinate=16,
            zcoordinate=0,
            defecttype='P',
            comment='test'
        )
        self.assertEqual(defect.xcoordinate, 562)
        response = self.client.post(self.url_defect_list, self.defect, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
