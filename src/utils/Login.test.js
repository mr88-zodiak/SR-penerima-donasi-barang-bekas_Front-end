import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'
import { useAuth } from '@/store/auth'

vi.mock('axios')

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('Auth Store Login', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.stubGlobal('localStorage', {
      setItem: vi.fn(),
      getItem: vi.fn(),
    })
  })

  it('login admin berhasil menyimpan token dan redirect', async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: {
        access_token: 'fake-token',
        user: {
          role: 'admin',
          dataDiriId: 1,
        },
      },
    })

    const store = useAuth()
    store.formLogin.email = 'admin@mail.com'
    store.formLogin.password = '123456'

    await store.Login()

    expect(localStorage.setItem).toHaveBeenCalled()
    expect(axios.post).toHaveBeenCalled()
  })
})

describe('Auth Store Login Failure', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.stubGlobal('localStorage', {
      setItem: vi.fn(),
      getItem: vi.fn(),
    })
  })

  it('login gagal mengembalikan pesan error', async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    })
    const store = useAuth()
    store.formLogin.email = 'admin@mail.com'
    store.formLogin.password = '123456'
    await store.Login()
    expect(store.errorMessage).toBe('Invalid credentials')
    expect(axios.post).toHaveBeenCalled()
  })
})
describe('form login kosong', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('mengembalikan pesan error saat form login kosong', async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: 'Email atau password tidak boleh kosong',
        },
      },
    })
    const store = useAuth()
    store.formLogin.email = ''
    store.formLogin.password = ''

    await store.Login()
    expect(store.errorMessage).toBe('Email atau password tidak boleh kosong')
  })
})

describe('Login gagal', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('mengembalikan pesan error saat login gagal', async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: 'Email atau password salah',
        },
      },
    })

    const store = useAuth()
    store.formLogin.email = 'admin@mail.com'
    store.formLogin.password = 'wrongpassword'

    await store.Login()

    expect(store.errorMessage).toBe('Email atau password salah')
    expect(axios.post).toHaveBeenCalled()
  })
})
